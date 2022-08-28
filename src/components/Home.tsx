import { CartState } from "../context/Context";
import Filters from "./Filters";
import NotFound from "./NotFound";
import Product from "./Product";

const Home = () => {
  const {
    state: { products },
    productState: { byPrice, byColor, byGender, byType, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;
    if (Number(byPrice)) {
      sortedProducts = sortedProducts.filter((prod: any) => {
        return prod.price >= +byPrice;
      });
    }
    if (byColor.length) {
      sortedProducts = sortedProducts.filter((prod: any) =>
        byColor.includes(prod.color)
      );
    }

    if (byGender.length) {
      sortedProducts = sortedProducts.filter((prod: any) =>
        byGender.includes(prod.gender)
      );
    }

    if (byType.length) {
      sortedProducts = sortedProducts.filter((prod: any) =>
        byType.includes(prod.type)
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod: any) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters totalFiltered={transformProducts()} />
      <div className="productContainer">
        {transformProducts().length > 0 ? (
          transformProducts().map((prod: any) => (
            <Product prod={prod} key={prod.id} />
          ))
        ) : (
          <NotFound />
        )}

        {/* {transformProducts().map((prod: any) => (
          <Product prod={prod} key={prod.id} />
        ))} */}
      </div>
    </div>
  );
};

export default Home;
