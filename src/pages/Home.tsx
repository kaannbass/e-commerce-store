import { CardCategory, CustomCarousel, PopularProducts } from '../components';

const HomePage = () => {
  return (
    <div>
      <section style={{ padding: 10 }}>
        <CustomCarousel />
      </section>
      <section>
        <PopularProducts />
      </section>
      <section>
        <CardCategory />
      </section>
    </div>
  );
};

export default HomePage;
