import moment from "moment";
import { Nav, Dropdown, Tab, Row, Col } from "react-bootstrap";
const TimeSlots = (props) => {
    return ( 
<Tab.Container
              id="left-tabs-example"
              defaultActiveKey="link-0"
            >
              <div className="date-container my-3">
                <Nav variant="tabs">
                  {props.onDate &&
                    props.onDate.filter(date=>date.is_available).map((date, index) => (
                      <Nav.Item className="mb-2" as="a">
                        <Nav.Link
                          onSelect={() => props.selectedDate(date.date)}
                          eventKey={`link-${index}`}
                        >
                          <p>{moment(date.date).utc().format("ddd")}</p>

                          <h4>{moment(date.date).utc().format("DD")}</h4>
                          <p>{moment(date.date).utc().format("MMM")}</p>
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                </Nav>
              </div>
              <Tab.Content>
                {props.onDate  &&
                  props.onDate.filter(date=>date.is_available).map((date, index) => (
                    <Tab.Pane
                      className="w-100"
                      id={moment(date.date).utc().format("DD")}
                      eventKey={`link-${index}`}
                    >
                      <Nav
                        variant="pills"
                        className=""
                        defaultActiveKey="date-0"
                      >
                        {props.onSlot &&
                          props.onSlot.length > 0 &&
                          props.onSlot
                            .filter((slot) =>
                              moment(slot.start).isSame(date.date, "day") && slot.is_available
                            )
                            .map((slot, index) => (
                            
                                  <Nav.Item
                                    // disabled={!slot.is_available}
                                    className="time-container mt-3"
                                  >
                                    <Nav.Link
                                      onSelect={() => props.selectedSlot(index)}
                                      eventKey={`date-${index}`}
                                      className="times  mr-3"
                                       disabled={!slot.is_available}
                                    >
                                      <p>
                                        {moment(slot.start).utc(true).format("h:mm A")}
                                        -
                                        {moment(slot.end).utc(true)
                                          .format("h:mm A")}
                                      </p>
                                    </Nav.Link>
                                  </Nav.Item>
                              
                            ))}
                      </Nav>
                    </Tab.Pane>
                  ))}
              </Tab.Content>
            </Tab.Container>

     );
}
 
export default TimeSlots;