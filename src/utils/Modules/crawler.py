import time
import json
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
import pandas as pd
from urllib.parse import quote
import logging
import os


class XiaohongshuCrawler:
    def __init__(self, cookies_file='cookies.json'):
        """初始化爬虫"""
        self.cookies_file = cookies_file
        self.setup_logging()
        self.setup_driver()
        self.load_cookies()
        self.data = []

    def setup_logging(self):
        """设置日志"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('xiaohongshu_crawler.log', encoding='utf-8'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def setup_driver(self):
        """配置Chrome无头浏览器"""
        chrome_options = Options()
        # 无头模式
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920,1080')
        chrome_options.add_argument('--enable-unsafe-swiftshader')
        # 设置User-Agent
        chrome_options.add_argument(
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
        # 禁用自动化标识
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)

        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            # 执行Chrome开发者协议命令，绕过webdriver检测
            self.driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
                "source": """
                    Object.defineProperty(navigator, 'webdriver', {
                        get: () => undefined
                    })
                """
            })
            self.wait = WebDriverWait(self.driver, 10)
            self.logger.info("浏览器初始化成功")
        except Exception as e:
            self.logger.error(f"浏览器初始化失败: {e}")
            raise

    def load_cookies(self):
        """从文件加载 cookies 到浏览器"""
        try:
            # 必须先访问域名才能设置 cookies
            self.driver.get("https://www.xiaohongshu.com")
            self.logger.info("访问主页以准备加载 cookies")
            time.sleep(2)  # 等待页面基本加载

            with open(self.cookies_file, 'r', encoding='utf-8') as f:
                cookies = json.load(f)

            added_any_cookie = False # 标记是否成功添加了至少一个 cookie
            for cookie in cookies:
                # 确保 cookie 包含必需的 'name' 和 'value' 字段
                if 'name' in cookie and 'value' in cookie:
                    # 可能需要处理 'sameSite' 字段，因为某些值可能不被支持
                    if 'sameSite' in cookie:
                        if cookie['sameSite'] not in ['Strict', 'Lax', 'None']:
                            cookie['sameSite'] = 'Lax'  # 设置为默认可接受的值
                    try:
                        self.driver.add_cookie(cookie)
                        self.logger.debug(f"已添加 Cookie: {cookie['name']}")
                        added_any_cookie = True
                    except Exception as e:
                        self.logger.warning(f"添加 Cookie {cookie.get('name', 'Unknown')} 时出错: {e}")
                        continue  # 跳过有问题的 cookie

            if added_any_cookie:
                self.logger.info(f"已从 {self.cookies_file} 尝试加载 cookies")
                # *** 关键修改：刷新页面以应用 cookies ***
                self.driver.refresh()
                self.logger.info("刷新页面以应用 cookies")
                time.sleep(3)  # 等待刷新后页面加载完成

                # *** 可选增强：再次访问主页，确保处于登录后的状态 ***
                # 这有助于确保后续的搜索操作是在登录状态下进行
                self.driver.get("https://www.xiaohongshu.com")
                self.logger.info("再次访问主页，确保登录状态")
                time.sleep(2) # 等待主页加载
            else:
                 self.logger.warning("未能成功添加任何 cookies，可能文件为空或格式不正确。")

        except json.JSONDecodeError as e:
            self.logger.error(f"Cookies 文件格式错误: {e}")
        except Exception as e:
            self.logger.error(f"加载 cookies 时出现未知错误: {e}", exc_info=True)

    def search_notes(self, keyword, max_pages=5):
        """
        搜索笔记内容
        :param keyword: 搜索关键词
        :param max_pages: 最大爬取页数
        """
        try:
            # 构造搜索URL
            search_url = f"https://www.xiaohongshu.com/search_result?keyword={quote(keyword)}&source=web_search_result_notes"
            self.logger.info(f"开始搜索关键词: {keyword}")

            self.driver.get(search_url)

            # 等待页面加载
            time.sleep(3)

            # 模拟滚动加载更多内容
            self.scroll_page()

            # 爬取指定页数的数据
            for page in range(max_pages):
                self.logger.info(f"正在爬取第 {page + 1} 页")
                self.extract_notes_data()

                # 尝试点击下一页
                if not self.click_next_page():
                    self.logger.info("没有更多页面或到达最后一页")
                    break

                # 随机延时，避免被检测
                time.sleep(random.uniform(2, 4))

        except Exception as e:
            self.logger.error(f"搜索过程中出现错误: {e}")

    def scroll_page(self):
        """滚动页面加载更多内容"""
        try:
            # 多次滚动以加载更多内容
            for i in range(3):
                # 滚动到页面底部
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(2)

                # 滚动到中间位置
                self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
                time.sleep(1)

                # 回到顶部
                self.driver.execute_script("window.scrollTo(0, 0);")
                time.sleep(1)

            self.logger.info("页面滚动完成")
        except Exception as e:
            self.logger.error(f"页面滚动出错: {e}")

    def extract_notes_data(self):
        """提取笔记数据"""
        try:
            # 查找笔记卡片元素
            note_elements = self.driver.find_elements(By.CSS_SELECTOR,
                                                      "div.note-item, div.note-card, [data-tag='feed-item']")

            if not note_elements:
                # 尝试其他可能的选择器
                note_elements = self.driver.find_elements(By.CSS_SELECTOR, "section, article")

            self.logger.info(f"找到 {len(note_elements)} 个笔记元素")

            for element in note_elements:
                try:
                    note_data = self.parse_note_element(element)
                    if note_data:
                        self.data.append(note_data)
                        self.logger.debug(f"提取到笔记: {note_data.get('title', 'N/A')}")
                except Exception as e:
                    self.logger.warning(f"解析单个笔记元素时出错: {e}")
                    continue

        except Exception as e:
            self.logger.error(f"提取笔记数据时出错: {e}")

    def parse_note_element(self, element):
        """解析单个笔记元素"""
        try:
            note_data = {}

            # 尝试提取标题
            try:
                title_element = element.find_element(By.CSS_SELECTOR, ".title, .note-title, h3, .content")
                note_data['title'] = title_element.text.strip()
            except:
                note_data['title'] = "未知标题"

            # 尝试提取作者
            try:
                author_element = element.find_element(By.CSS_SELECTOR, ".author, .nickname, .user-name")
                note_data['author'] = author_element.text.strip()
            except:
                note_data['author'] = "未知作者"

            # 尝试提取点赞数
            try:
                like_element = element.find_element(By.CSS_SELECTOR, ".like-count, .likes, .count")
                note_data['likes'] = like_element.text.strip()
            except:
                note_data['likes'] = "0"

            # 尝试提取收藏数
            try:
                collect_element = element.find_element(By.CSS_SELECTOR, ".collect-count, .collects")
                note_data['collects'] = collect_element.text.strip()
            except:
                note_data['collects'] = "0"

            # 尝试提取评论数
            try:
                comment_element = element.find_element(By.CSS_SELECTOR, ".comment-count, .comments")
                note_data['comments'] = comment_element.text.strip()
            except:
                note_data['comments'] = "0"

            # 尝试提取图片链接
            try:
                img_element = element.find_element(By.CSS_SELECTOR, "img")
                note_data['image_url'] = img_element.get_attribute('src') or img_element.get_attribute('data-src')
            except:
                note_data['image_url'] = ""

            # 添加时间戳
            note_data['crawl_time'] = time.strftime('%Y-%m-%d %H:%M:%S')

            return note_data

        except Exception as e:
            self.logger.warning(f"解析笔记元素失败: {e}")
            return None

    def click_next_page(self):
        """点击下一页"""
        try:
            # 查找下一页按钮
            next_buttons = self.driver.find_elements(By.CSS_SELECTOR, ".next-page, .pagination-next, [class*='next']")

            for button in next_buttons:
                if button.is_displayed() and button.is_enabled():
                    self.driver.execute_script("arguments[0].click();", button)
                    self.logger.info("点击下一页按钮")
                    time.sleep(3)  # 等待页面加载
                    return True

            self.logger.info("未找到下一页按钮")
            return False

        except Exception as e:
            self.logger.warning(f"点击下一页时出错: {e}")
            return False

    def save_data(self, filename="xiaohongshu_data.xlsx"):
        """保存数据到Excel文件"""
        try:
            if self.data:
                df = pd.DataFrame(self.data)
                df.to_excel(filename, index=False, engine='openpyxl')
                self.logger.info(f"数据已保存到 {filename}，共 {len(self.data)} 条记录")
            else:
                self.logger.warning("没有数据可保存")
        except Exception as e:
            self.logger.error(f"保存数据时出错: {e}")

    def save_to_json(self, filename="xiaohongshu_data.json"):
        """保存数据到JSON文件"""
        try:
            if self.data:
                with open(filename, 'w', encoding='utf-8') as f:
                    json.dump(self.data, f, ensure_ascii=False, indent=2)
                self.logger.info(f"数据已保存到 {filename}，共 {len(self.data)} 条记录")
            else:
                self.logger.warning("没有数据可保存")
        except Exception as e:
            self.logger.error(f"保存JSON数据时出错: {e}")

    def close(self):
        """关闭浏览器"""
        try:
            if hasattr(self, 'driver'):
                self.driver.quit()
                self.logger.info("浏览器已关闭")
        except Exception as e:
            self.logger.error(f"关闭浏览器时出错: {e}")

def save_cookies_example():
    """示例：手动登录后保存 cookies 的函数"""
    print("请在打开的浏览器中手动登录小红书...")
    chrome_options = Options()
    # 不使用无头模式，方便手动操作
    # chrome_options.add_argument('--headless=new')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--window-size=1920,1080')

    driver = webdriver.Chrome(options=chrome_options)
    try:
        driver.get("https://www.xiaohongshu.com")
        input("请在浏览器中登录小红书，然后按 Enter 键继续保存 cookies...")
        cookies = driver.get_cookies()
        with open('cookies.json', 'w', encoding='utf-8') as f:
            json.dump(cookies, f, ensure_ascii=False, indent=2)
        print("Cookies 已保存到 cookies.json")
    finally:
        driver.quit()

def main():
    """主函数"""
    # 创建爬虫实例
    crawler = XiaohongshuCrawler(cookies_file='cookies.json')

    try:
        # 设置搜索关键词
        keywords = ["罗小黑战记2", "某某", "旧故新长"]  # 可以添加多个关键词

        for keyword in keywords:
            print(f"\n开始爬取关键词: {keyword}")
            crawler.search_notes(keyword, max_pages=3)  # 爬取3页数据
            time.sleep(random.uniform(3, 6))  # 关键词之间随机延时

        # 保存数据
        crawler.save_data("xiaohongshu_search_results.xlsx")
        crawler.save_to_json("xiaohongshu_search_results.json")

        print(f"\n爬取完成！共获取 {len(crawler.data)} 条数据")

    except KeyboardInterrupt:
        print("\n用户中断爬取")
    except Exception as e:
        print(f"爬取过程中出现错误: {e}")
    finally:
        crawler.close()

if __name__ == "__main__":
    save_cookies_example()
    print('开始爬取网页内容...')
    main()