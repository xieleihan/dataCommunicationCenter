/**
 * 将图片文件转换为WebP格式
 * @param {File|Blob|HTMLImageElement} image - 图片文件或图片元素
 * @param {number} quality - 图片质量 (0-1)
 * @returns {Promise<Blob>} WebP格式的Blob对象
 */
export const convertToWebp = (image, quality = 1) => {
    return new Promise((resolve, reject) => {
        // 创建canvas元素
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 创建图片对象
        const img = new Image();

        // 处理不同类型的输入
        if (image instanceof File || image instanceof Blob) {
            const reader = new FileReader();
            reader.onload = function (e) {
                img.src = e.target.result;
            };
            reader.readAsDataURL(image);
        } else if (image instanceof HTMLImageElement) {
            img.src = image.src;
        } else {
            reject(new Error('不支持的图片格式'));
            return;
        }

        // 图片加载完成后进行转换
        img.onload = function () {
            try {
                // 设置canvas尺寸
                canvas.width = img.width;
                canvas.height = img.height;

                // 在canvas上绘制图片
                ctx.drawImage(img, 0, 0);

                // 转换为WebP格式
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('转换失败'));
                        }
                    },
                    'image/webp',
                    quality
                );
            } catch (error) {
                reject(error);
            }
        };

        img.onerror = function () {
            reject(new Error('图片加载失败'));
        };
    });
}