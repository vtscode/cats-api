import { Carousel, Image } from "antd";
import { memo } from "react";
const CarouselComp = ({ detailBreed }) => {
  const imgs = detailBreed ? detailBreed : [];
  return (
    <Carousel autoplay style={{ textAlign: "center" }}>
      {imgs.map((x, idx) => (
        <div key={x.id}>
          <Image
            width={300}
            height={300}
            src={x.url}
            style={{
              borderRadius: 10,
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};
export default memo(CarouselComp);
