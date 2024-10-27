//小标题板
import React from 'react';

const Banner = ({ imageSrc, iconSrc, text }) => {
  const styles = {
    banner: {
      width: '95%',
      height: '60px', // 设置高度
      backgroundImage: `url(${imageSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      margin: '0 auto',
      position: 'relative', // 设置为相对定位
    },
    content: {
      position: 'absolute', // 绝对定位
      top: '50%', // 垂直居中
      left: '50%', // 水平居中
      transform: 'translate(-50%, -50%)', // 精确居中
      display: 'flex',
      alignItems: 'center',
      color: '#705850', // 文字颜色
      fontSize: '30px',
    },
    icon: {
      maxWidth: '40px', // 设置最大宽度
      maxHeight: '40px', // 设置最大高度
      marginRight: '20px', // 图标和文字之间的间距
    },
  };

  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        {iconSrc && <img src={iconSrc} alt="图标" style={styles.icon} />}
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Banner;