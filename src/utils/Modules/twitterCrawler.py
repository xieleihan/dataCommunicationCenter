import time
import json
import random
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException, StaleElementReferenceException
import pandas as pd
from urllib.parse import quote
import logging

# 开发中
class TwitterCrawler:
    def __init__(self, cookies_file='twitter_cookies.json', headless=True):
        """
        初始化爬虫
        :param cookies_file: 包含登录 cookies 的 JSON 文件路径
        :param headless: 是否使用无头模式
        """
        self.cookies_file = cookies_file
        self.setup_logging()
        self.setup_driver(headless)
        self.load_cookies()
        self.data = []
        self.tweet_data = [] # 专门存储推文数据

    def setup_logging(self):
        """设置日志"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('twitter_crawler.log', encoding='utf-8'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def setup_driver(self, headless=True):
        """配置Chrome浏览器"""
        chrome_options = Options()
        if headless:
            chrome_options.add_argument('--headless=new') # 使用 new headless 模式
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920,1080')
        # 设置User-Agent
        chrome_options.add_argument(
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
        # 禁用自动化标识
        chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
        chrome_options.add_experimental_option('useAutomationExtension', False)
        # 其他可能有用的选项
        # chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        # chrome_options.add_argument('--lang=en-US') # 设置语言

