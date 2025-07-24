<template>
    <div class="canvasImage">
        <input type="file" accept="image/*" @change="onFileChange" />
        <div class="canvas-container" ref="container">
            <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" @mousedown="startDrag" @mousemove="onDrag"
                @mouseup="endDrag" @mouseleave="endDrag" style="cursor: crosshair;"></canvas>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineExpose } from 'vue';

const emit = defineEmits(['preview-update']);
const canvas = ref(null);
const container = ref(null);

const img = new Image();
const imgWidth = ref(0);
const imgHeight = ref(0);
const canvasWidth = ref(400);
const canvasHeight = ref(300);

// 裁剪框属性
const cropX = ref(50);
const cropY = ref(50);
const cropW = ref(150);
const cropH = ref(150);

// 拖动状态
const isDragging = ref(false);
const dragType = ref(''); // 'move', 'resize-tl', 'resize-tr', 'resize-bl', 'resize-br'
const startX = ref(0);
const startY = ref(0);
const startCropX = ref(0);
const startCropY = ref(0);
const startCropW = ref(0);
const startCropH = ref(0);

// 图片上传处理
const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
};

// 图片加载完成后绘制到 canvas 上
img.onload = () => {
    imgWidth.value = img.width;
    imgHeight.value = img.height;

    // 计算合适的画布尺寸
    const maxWidth = 600;
    const maxHeight = 400;
    const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
    canvasWidth.value = img.width * ratio;
    canvasHeight.value = img.height * ratio;

    // 初始化裁剪框位置（居中）
    cropX.value = (canvasWidth.value - cropW.value) / 2;
    cropY.value = (canvasHeight.value - cropH.value) / 2;

    drawImage();
    emitPreview(); // 初始预览
};

// 绘制原图和裁剪区域
const drawImage = () => {
    if (!canvas.value) return;

    const context = canvas.value.getContext('2d');
    context.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

    // 绘制原图
    context.drawImage(img, 0, 0, canvasWidth.value, canvasHeight.value);

    // 只绘制裁剪框边框（不需要遮罩）
    context.strokeStyle = '#00ff00';
    context.lineWidth = 2;
    context.strokeRect(cropX.value, cropY.value, cropW.value, cropH.value);

    // 绘制裁剪框的角点和边线手柄
    const cornerSize = 8;
    context.fillStyle = '#00ff00';

    // 四个角点
    context.fillRect(cropX.value - cornerSize / 2, cropY.value - cornerSize / 2, cornerSize, cornerSize);
    context.fillRect(cropX.value + cropW.value - cornerSize / 2, cropY.value - cornerSize / 2, cornerSize, cornerSize);
    context.fillRect(cropX.value - cornerSize / 2, cropY.value + cropH.value - cornerSize / 2, cornerSize, cornerSize);
    context.fillRect(cropX.value + cropW.value - cornerSize / 2, cropY.value + cropH.value - cornerSize / 2, cornerSize, cornerSize);

    // 四条边的中点手柄
    const handleSize = 6;
    context.fillRect(cropX.value + cropW.value / 2 - handleSize / 2, cropY.value - handleSize / 2, handleSize, handleSize);
    context.fillRect(cropX.value + cropW.value / 2 - handleSize / 2, cropY.value + cropH.value - handleSize / 2, handleSize, handleSize);
    context.fillRect(cropX.value - handleSize / 2, cropY.value + cropH.value / 2 - handleSize / 2, handleSize, handleSize);
    context.fillRect(cropX.value + cropW.value - handleSize / 2, cropY.value + cropH.value / 2 - handleSize / 2, handleSize, handleSize);
};

// 获取鼠标在canvas上的坐标
const getMousePos = (e) => {
    const rect = canvas.value.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
};

// 判断鼠标位置
const getDragType = (x, y) => {
    const cornerSize = 8;
    const tolerance = 10;

    // 检查是否在角点上
    // 左上角
    if (Math.abs(x - cropX.value) < tolerance && Math.abs(y - cropY.value) < tolerance) {
        return 'resize-tl';
    }
    // 右上角
    if (Math.abs(x - (cropX.value + cropW.value)) < tolerance && Math.abs(y - cropY.value) < tolerance) {
        return 'resize-tr';
    }
    // 左下角
    if (Math.abs(x - cropX.value) < tolerance && Math.abs(y - (cropY.value + cropH.value)) < tolerance) {
        return 'resize-bl';
    }
    // 右下角
    if (Math.abs(x - (cropX.value + cropW.value)) < tolerance && Math.abs(y - (cropY.value + cropH.value)) < tolerance) {
        return 'resize-br';
    }

    // 检查是否在裁剪框内部（用于移动）
    if (x > cropX.value && x < cropX.value + cropW.value &&
        y > cropY.value && y < cropY.value + cropH.value) {
        return 'move';
    }

    return '';
};

// 开始拖动
const startDrag = (e) => {
    const pos = getMousePos(e);
    dragType.value = getDragType(pos.x, pos.y);

    if (dragType.value) {
        isDragging.value = true;
        startX.value = pos.x;
        startY.value = pos.y;
        startCropX.value = cropX.value;
        startCropY.value = cropY.value;
        startCropW.value = cropW.value;
        startCropH.value = cropH.value;
        e.preventDefault();
    }
};

// 拖动过程中
const onDrag = (e) => {
    if (!isDragging.value) return;

    const pos = getMousePos(e);
    const dx = pos.x - startX.value;
    const dy = pos.y - startY.value;

    switch (dragType.value) {
        case 'move':
            cropX.value = Math.max(0, Math.min(canvasWidth.value - cropW.value, startCropX.value + dx));
            cropY.value = Math.max(0, Math.min(canvasHeight.value - cropH.value, startCropY.value + dy));
            break;

        case 'resize-tl':
            // 左上角调整大小
            const newW1 = startCropW.value - dx;
            const newH1 = startCropH.value - dy;
            if (newW1 > 20 && newH1 > 20) {
                cropX.value = startCropX.value + dx;
                cropY.value = startCropY.value + dy;
                cropW.value = newW1;
                cropH.value = newH1;
            }
            break;

        case 'resize-tr':
            // 右上角调整大小
            const newW2 = startCropW.value + dx;
            const newH2 = startCropH.value - dy;
            if (newW2 > 20 && newH2 > 20) {
                cropY.value = startCropY.value + dy;
                cropW.value = newW2;
                cropH.value = newH2;
            }
            break;

        case 'resize-bl':
            // 左下角调整大小
            const newW3 = startCropW.value - dx;
            const newH3 = startCropH.value + dy;
            if (newW3 > 20 && newH3 > 20) {
                cropX.value = startCropX.value + dx;
                cropW.value = newW3;
                cropH.value = newH3;
            }
            break;

        case 'resize-br':
            // 右下角调整大小
            const newW4 = startCropW.value + dx;
            const newH4 = startCropH.value + dy;
            if (newW4 > 20 && newH4 > 20) {
                cropW.value = newW4;
                cropH.value = newH4;
            }
            break;
    }

    drawImage();
    emitPreview();
};

// 结束拖动
const endDrag = () => {
    isDragging.value = false;
    dragType.value = '';
};

// 导出裁剪结果
const emitPreview = () => {
    if (!img.complete || imgWidth.value === 0) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = cropW.value * (imgWidth.value / canvasWidth.value);
    tempCanvas.height = cropH.value * (imgHeight.value / canvasHeight.value);

    const tempCtx = tempCanvas.getContext('2d');

    // 计算实际图片坐标
    const scaleX = imgWidth.value / canvasWidth.value;
    const scaleY = imgHeight.value / canvasHeight.value;

    tempCtx.drawImage(
        img,
        cropX.value * scaleX,
        cropY.value * scaleY,
        cropW.value * scaleX,
        cropH.value * scaleY,
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
    );

    tempCanvas.toBlob((blob) => {
        if (blob) {
            const url = URL.createObjectURL(blob);
            emit('preview-update', url);
        }
    }, 'image/jpeg', 0.8);
};

// 实时监听裁剪区域变化
watch([cropX, cropY, cropW, cropH], () => {
    drawImage();
    emitPreview();
});

// 暴露方法给父组件
defineExpose({
    getCroppedBlob: () => {
        return new Promise((resolve) => {
            if (!img.complete || imgWidth.value === 0) {
                resolve(null);
                return;
            }

            const tempCanvas = document.createElement('canvas');
            const scaleX = imgWidth.value / canvasWidth.value;
            const scaleY = imgHeight.value / canvasHeight.value;

            tempCanvas.width = cropW.value * scaleX;
            tempCanvas.height = cropH.value * scaleY;

            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.drawImage(
                img,
                cropX.value * scaleX,
                cropY.value * scaleY,
                cropW.value * scaleX,
                cropH.value * scaleY,
                0,
                0,
                tempCanvas.width,
                tempCanvas.height
            );

            tempCanvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg', 0.8);
        });
    },
    getOriginalPic: () => ({ url: img.src }),
});
</script>

<style scoped>
.canvasImage {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.canvas-container {
    border: 1px solid #ccc;
    display: inline-block;
    width: 100%;
    height: 100%;
}

canvas {
    display: block;
    width: 100%;
}
</style>