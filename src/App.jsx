import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetailsHandler } from "./Details";
import { useEffect, useState } from "react";
import {getSingleUserDetailsHandler} from './SelectedUserData'
import _ from "lodash";
import {
  BrandMailgun,
  PhoneCall,
  World,
  UserPlus,
  Trash,
  UserMinus,
  JewishStar,
} from "tabler-icons-react";
import Card from "@material-ui/core/Card";

export default function App() {
  const user_details = useSelector((state) => state.Details.data);
  const dispatch = useDispatch();

  const [followClick, setFollowClick] = useState();
  const [deleteClick, setDeleteClick] = useState();
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringId, setIsHoveringId] = useState("");
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  useEffect(() => {
    if (user_details !== undefined && !_.isEmpty(user_details))
      setDeleteClick(user_details);
  }, [user_details]);
  console.log("user_details", user_details);
  useEffect(() => {
    dispatch(getUserDetailsHandler()); 
  }, []);
  return (
    <div>
      {deleteClick?.map((user) => (
        <Card
          key={user?.id}
          style={{
            margin: "10px",
            width: "300px",
            height: "300px",
            display: "inline-block",
          }}
        >
          {isHovering && isHoveringId === user.id && (
            <div
              className="App"
              style={{
                fontWeight: "bold",
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: "1px",
                marginTop: "10px",
                width: "120px",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                backgroundColor: "black",
                color: "white",
                fontSize: "16px",
              }}
            >
              {user.name}
            </div>
          )}
          <div
            className="circle"
            onMouseOver={() => handleMouseOver(setIsHoveringId(user.id))}
            onMouseOut={handleMouseOut}
            style={{
              cursor: "pointer",
            }}
            onClick={()=>dispatch(getSingleUserDetailsHandler(user?.username)) }
          >
            {user.name.split(" ")?.[0]?.charAt(0)}
            {""}
            {user.name.split(" ")?.[1]?.charAt(0)}
          </div>
          <div
            className="App"
            style={{ fontWeight: "bold", marginTop: "10px" }}
          >
            {followClick === user.id ? (
              <>
                {user.name}{" "}
                <JewishStar
                  size={16}
                  style={{
                    marginLeft: "10px",
                    fontWeight: "normal",
                    marginTop: "5px",
                  }}
                />
              </>
            ) : (
              user.name
            )}
          </div>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <BrandMailgun
              size={16}
              style={{
                marginLeft: "10px",
                fontWeight: "normal",
                marginTop: "2px",
              }}
            />
            <div style={{ fontWeight: "normal", marginLeft: "5px" }}>
              {user.email}
            </div>
          </div>

          <div style={{ display: "flex", marginTop: "10px" }}>
            <PhoneCall
              size={16}
              style={{
                marginLeft: "10px",
                fontWeight: "normal",
                marginTop: "2px",
              }}
            />
            <div style={{ fontWeight: "normal", marginLeft: "5px" }}>
              {user.phone}
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <World
              size={16}
              style={{
                marginLeft: "10px",
                fontWeight: "normal",
                marginTop: "2px",
              }}
            />
            <div style={{ fontWeight: "normal", marginLeft: "5px" }}>
              {user.website}
            </div>
          </div>
          {followClick === user.id ? (
            <>
              <button
                style={{
                  width: "120px",
                  height: "30px",
                  marginTop: "10px",
                  marginLeft: "10px",
                  backgroundColor: "blue",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setFollowClick()}
              >
                <>
                  <UserMinus
                    size={14}
                    style={{ marginRight: "10px", marginTop: "2px" }}
                  />
                  Unfollow
                </>
              </button>
            </>
          ) : (
            <>
              <button
                style={{
                  width: "120px",
                  height: "30px",
                  marginTop: "10px",
                  marginLeft: "10px",
                  backgroundColor: "blue",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setFollowClick(user.id)}
              >
                <>
                  <UserPlus
                    size={14}
                    style={{ marginRight: "10px", marginTop: "2px" }}
                  />
                  Follow
                </>
              </button>
            </>
          )}

          <button
            style={{
              width: "120px",
              height: "30px",
              marginTop: "10px",
              marginLeft: "10px",
              color: "blue",
              cursor: "pointer",
            }}
            onClick={() => {
              setDeleteClick(
                deleteClick?.filter((item) => item.id !== user.id),
              );
            }}
          >
            <Trash
              size={14}
              style={{ marginRight: "10px", marginTop: "2px" }}
            />
            Delete
          </button>
        </Card>
      ))}
    </div>
  );
}
