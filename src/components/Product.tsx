import { Badge, Button, Card, CardGroup } from "react-bootstrap";
import { CartState } from "../context/Context";

const Product = ({ prod }: any) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  return (
    <div className="products">
      <Card>
        <Card.Img variant="top" src={prod?.imageURL} alt={prod.name} />
        <Card.Body>
          <Card.Title className="title">
            {prod.name}

            <span>
              <Badge pill bg="secondary">
                {prod.gender}
              </Badge>
            </span>
          </Card.Title>
          <CardGroup className="products-pricing">
            <Card.Subtitle style={{ paddingBottom: 10 }}>
              <span>₹ {prod.price}</span>
            </Card.Subtitle>

            {cart.some((p: any) => p.id === prod.id) ? (
              <Button
                style={{ width: 100 + "%" }}
                variant="outline-danger"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: prod,
                  })
                }
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                style={{ width: 100 + "%" }}
                onClick={() =>
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: prod,
                  })
                }
                disabled={!prod.quantity}
              >
                {!prod.quantity ? "Out of Stock" : "Add to Cart"}
              </Button>
            )}
          </CardGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
