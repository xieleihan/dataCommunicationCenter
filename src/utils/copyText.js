// 优雅降级
/**
 * 复制文本到剪贴板
 * @param {String} text 需要复制的文本
 * @returns {Boolean} 返回是否复制成功
 */
export async function copyText(text) {
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            fallbackCopyText(text);
            return false;
        }
    } else {
        fallbackCopyText(text);
        return false;
    }
}

/**
 * 兼容性处理：使用textarea元素复制文本
 * @param {String} text 需要复制的文本
 */
function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }