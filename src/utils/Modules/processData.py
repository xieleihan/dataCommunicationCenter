import os
import re
from pathlib import Path

def process_ts_files(directory_path):
    """
    处理指定目录下的所有.ts文件，为其添加导出语句
    
    Args:
        directory_path (str): 要处理的目录路径
    """
    
    # 获取目录路径对象
    directory = Path(directory_path)
    
    # 检查目录是否存在
    if not directory.exists():
        print(f"错误: 目录 '{directory_path}' 不存在")
        return
    
    if not directory.is_dir():
        print(f"错误: '{directory_path}' 不是一个目录")
        return
    
    # 查找所有.ts文件
    ts_files = list(directory.glob("*.ts"))
    
    if not ts_files:
        print(f"在目录 '{directory_path}' 中没有找到.ts文件")
        return
    
    print(f"找到 {len(ts_files)} 个.ts文件")
    
    # 处理每个.ts文件
    processed_count = 0
    failed_count = 0
    
    for ts_file in ts_files:
        try:
            # 获取不包含后缀的文件名
            file_name_without_ext = ts_file.stem
            
            # 验证文件名是否符合JavaScript变量命名规范
            if not is_valid_variable_name(file_name_without_ext):
                print(f"跳过文件 '{ts_file.name}': 文件名不符合变量命名规范")
                failed_count += 1
                continue
            
            # 读取文件内容
            with open(ts_file, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # 检查是否已经添加过导出语句
            if content.strip().startswith(f'export const {file_name_without_ext} ='):
                print(f"跳过文件 '{ts_file.name}': 已经包含导出语句")
                continue
            
            # 创建新的内容（在原内容前添加导出语句）
            if file_name_without_ext.isdigit():
                file_name_without_ext = '$' + file_name_without_ext

            new_content = f"export const {file_name_without_ext} = {content}"
            
            # 写回文件
            with open(ts_file, 'w', encoding='utf-8') as file:
                file.write(new_content)
            
            print(f"✓ 处理成功: {ts_file.name}")
            processed_count += 1
            
        except Exception as e:
            print(f"✗ 处理失败: {ts_file.name} - {str(e)}")
            failed_count += 1
    
    # 输出处理结果
    print(f"\n处理完成:")
    print(f"  成功处理: {processed_count} 个文件")
    print(f"  处理失败: {failed_count} 个文件")
    print(f"  总计文件: {len(ts_files)} 个文件")

def is_valid_variable_name(name):
    """
    检查文件名是否符合JavaScript变量命名规范
    
    Args:
        name (str): 要检查的名称
        
    Returns:
        bool: 是否符合规范
    """
    processed_name = name
    if name.isdigit():
        processed_name = '$' + name
        return True

    # 不能以数字开头
    if name[0].isdigit():
        return False

    # 只能包含字母、数字、下划线，且不能是JavaScript保留字
    if not re.match(r'^[a-zA-Z_$][a-zA-Z0-9_$]*$', processed_name):
        return False
    
    # 检查是否为JavaScript保留字
    reserved_words = {
        'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default',
        'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function',
        'if', 'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch',
        'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield',
        'let', 'static', 'package', 'private', 'protected', 'public', 'interface',
        'enum', 'implements', 'abstract', 'boolean', 'byte', 'char', 'double',
        'final', 'float', 'goto', 'int', 'long', 'native', 'short', 'synchronized',
        'throws', 'transient', 'volatile', 'null', 'true', 'false'
    }
    
    return processed_name not in reserved_words

def process_ts_files_advanced(directory_path, backup=True, preview=False):
    """
    高级版本：支持备份和预览功能
    
    Args:
        directory_path (str): 要处理的目录路径
        backup (bool): 是否创建备份文件
        preview (bool): 是否只预览不实际修改
    """
    
    directory = Path(directory_path)
    
    if not directory.exists() or not directory.is_dir():
        print(f"错误: 目录 '{directory_path}' 不存在或不是目录")
        return
    
    ts_files = list(directory.glob("*.ts"))
    
    if not ts_files:
        print(f"在目录 '{directory_path}' 中没有找到.ts文件")
        return
    
    print(f"找到 {len(ts_files)} 个.ts文件")
    
    if preview:
        print("\n=== 预览模式 ===")
    
    processed_files = []
    
    for ts_file in ts_files:
        try:
            file_name_without_ext = ts_file.stem
            
            if not is_valid_variable_name(file_name_without_ext):
                print(f"跳过: '{ts_file.name}' (文件名不符合变量命名规范)")
                continue
            
            # 读取文件内容
            with open(ts_file, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # 检查是否已经处理过
            if content.strip().startswith(f'export const {file_name_without_ext} ='):
                print(f"跳过: '{ts_file.name}' (已包含导出语句)")
                continue
            
            # 生成新内容
            new_content = f"export const {file_name_without_ext} = {content}"
            
            if preview:
                print(f"将处理: {ts_file.name}")
                print(f"  原内容前50字符: {content[:50]}...")
                print(f"  新导出语句: export const {file_name_without_ext} = ...")
                print("---")
            else:
                # 创建备份（如果启用）
                if backup:
                    backup_path = ts_file.with_suffix('.ts.bak')
                    with open(ts_file, 'r', encoding='utf-8') as original:
                        with open(backup_path, 'w', encoding='utf-8') as backup_file:
                            backup_file.write(original.read())
                
                # 写入新内容
                with open(ts_file, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                
                print(f"✓ 处理完成: {ts_file.name}")
            
            processed_files.append(ts_file.name)
            
        except Exception as e:
            print(f"✗ 处理失败: {ts_file.name} - {str(e)}")
    
    if preview:
        print(f"\n预览完成: 将处理 {len(processed_files)} 个文件")
    else:
        print(f"\n处理完成: 成功处理 {len(processed_files)} 个文件")

def batch_rename_with_export_statements():
    """
    交互式批量处理函数
    """
    print("=== TS文件批量添加导出语句工具 ===\n")
    
    while True:
        # 获取目录路径
        directory_path = input("请输入包含.ts文件的目录路径 (或输入 'quit' 退出): ").strip()
        
        if directory_path.lower() == 'quit':
            print("再见!")
            break
        
        if not directory_path:
            print("路径不能为空，请重新输入\n")
            continue
        
        # 询问是否预览
        preview_input = input("是否先预览将要修改的文件? (y/n, 默认n): ").strip().lower()
        preview = preview_input in ['y', 'yes']
        
        # 询问是否备份
        backup_input = input("是否创建备份文件? (y/n, 默认y): ").strip().lower()
        backup = backup_input not in ['n', 'no']
        
        print("\n开始处理...")
        process_ts_files_advanced(directory_path, backup=backup, preview=preview)
        
        print("\n" + "="*50 + "\n")

# 使用示例
if __name__ == "__main__":
    # 方式1: 直接处理指定目录
    process_ts_files("./data")
    
    # 方式2: 使用高级功能
    # process_ts_files_advanced("./src/types", backup=True, preview=False)
    
    # 方式3: 交互式使用
    # batch_rename_with_export_statements()