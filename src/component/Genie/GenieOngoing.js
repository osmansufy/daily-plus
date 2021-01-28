import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../axios";
import Spinner from "../../container/Spinner/Spinner";
import emptyImg from "../../assets/img/empty.png";
import cartIcon from "../../assets/img/cart.png";
import moment from "moment";
import { Container, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { statusOrder } from "../../utility/orderStatus";

const GenieOngoing = () => {
  const usersToken = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);
  const [genieAllOrder, setGenieAllOrder] = useState([]);
  const history = useHistory();

  const statusReducer = (currStatus, action) => {
    switch (action.type) {
      case 6:
        return "cancelled";

      case 5:
        return "complete";

      case 4:
        return "on-the-way";

      case 3:
        return "processing";

      case 2:
        return "confirmed";
      case 1:
        return "pending";

      default:
        throw new Error("Should not get there!");
    }
  };
  const onGenieOrderDetails = (id) => {
    history.push({
      pathname: "/genie/order/info",
      //  search: `?id=${id}`,
      state: { id: id },
    });
  };

  useEffect(() => {
    if (usersToken) {
      setLoading(true);
      axios
        .get("order/genielist/order/", {
          headers: {
            Authorization: `JWT ${usersToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          setGenieAllOrder(response.data);
          setLoading(false);
          //    statDispatch({type:response.data.status})
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  let contentGenieHistory = "";
  if (loading) {
    contentGenieHistory = <Spinner />;
  } else if (!loading && genieAllOrder.length > 0) {
    contentGenieHistory = genieAllOrder
      .filter((order) => order.status == 1)
      .map((order) => {
        // statDispatch({type:order.status})
        return (
          <a onClick={() => onGenieOrderDetails(order.id)}>
            {" "}
            <div className="row order-info">
              <div className="info-left">
                <img src={cartIcon} />
                <div className="oInfo">
                  <h4>{order.order_identifier}</h4>
                  <h5>{statusOrder(order.status)}</h5>
                  <h5>
                    {moment(order.ts_created).utc().format("MMM DD.YYYY")}
                  </h5>
                </div>
              </div>
              <span>ট{order.total_bill} </span>
            </div>
          </a>
        );
      });
  } else {
    contentGenieHistory = (
      <div className="row ongoing justify-content-center">
        <img src={emptyImg} />
        <p>There is no ongoing order right now. You can order from home</p>
      </div>
    );
  }
  return (
    <Container>
      <Row>
        <div className="col-md-8 my-5 mx-auto">{contentGenieHistory}</div>
      </Row>
    </Container>
  );
};

export default GenieOngoing;
