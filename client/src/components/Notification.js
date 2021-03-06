import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Container, Card } from "semantic-ui-react";

import { checkResponse } from "../util/ResponseUtil";
import { getAuthName, getAuthToken } from "../util/AuthenticationUtil";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [friendshipNotifications, setFriendshipNotifications] = useState([]);
  const [partyNotifications, setPartyNotifications] = useState([]);
  //{ isFriend: false, name: "", id: "" }

  useEffect(() => {
    // fetch friendship notifications
    fetch("http://localhost:4000/api/user/getFriendshipInvitations", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getAuthToken(),
          username: getAuthName(),
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
          let resArray = r.data;
          console.log( r.data);
          let newFriendNotifications = [ ...notifications ];
          for ( let i = 0; i < resArray.length; i++)
          {
            newFriendNotifications.push( { isFriend: true, name: resArray[ i].inviterUsername, id: resArray[ i].inviterUsername } );
          }
          setFriendshipNotifications( newFriendNotifications);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error, could not get friend requests!");
        });

    // fetch party notifications
    fetch("http://localhost:4000/api/party/getInvitations", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: getAuthToken(),
          username: getAuthName(),
        }),
      })
        .then((r) => checkResponse(r))
        .then((r) => r.json())
        .then((r) => {
          let resArray = r.data;
          console.log( r.data);
          let newPartyNotifications = [ ...notifications ];
          for ( let i = 0; i < resArray.length; i++)
          {
            newPartyNotifications.push( { isFriend: false, name: resArray[ i].name, id: resArray[ i].partyId } );
          }
          setPartyNotifications( newPartyNotifications)
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error, could not get patry requests!");
        });
  }, []);

  useEffect(() => {
    let newNotifications = [];
    for ( let i = 0; i < friendshipNotifications.length; i++)
    {
        newNotifications.push( friendshipNotifications[i] );
    }
    for ( let i = 0; i < partyNotifications.length; i++)
    {
        newNotifications.push( partyNotifications[i] );
    }
    setNotifications( newNotifications);
  }, [friendshipNotifications, partyNotifications]);

  const handleYes = (clickedNotification) => {

    let temp = [];
    notifications.forEach((notification) => {
      if (notification !== clickedNotification) temp.push(notification);
    });

    if ( clickedNotification.isFriend) // add to friendship
    {
        fetch("http://localhost:4000/api/user/acceptFriendshipInvitation", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: getAuthToken(),
              username: getAuthName(),
                
              inviterUsername: clickedNotification.id,
            }),
          })
            .then((r) => checkResponse(r))
            .then((r) => r.json())
            .then((r) => {
              setNotifications( temp);
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error, could not accept friend request!");
            });
    }
    else // add to party
    {

        fetch("http://localhost:4000/api/party/acceptInvite", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: getAuthToken(),
              username: getAuthName(),

              partyId: clickedNotification.id,
              invitedUsername: getAuthName(),
              description: ":(",
              name: clickedNotification.name,
            }),
          })
            .then((r) => checkResponse(r))
            .then((r) => r.json())
            .then((r) => {
              setNotifications(temp);
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error, could not accept party invitaion!");
            });
    }
  };

  const handleNo = (clickedNotification) => {
    let temp = [];
    notifications.forEach((notification) => {
      if (notification !== clickedNotification) temp.push(notification);
    });

    // fetch reject relation
    if ( clickedNotification.isFriend ) // reject friend request
    {
        fetch("http://localhost:4000/api/user/refuseFriendshipInvitation", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: getAuthToken(),
              username: getAuthName(),
                
              inviterUsername: clickedNotification.id,
            }),
          })
            .then((r) => checkResponse(r))
            .then((r) => r.json())
            .then((r) => {
              setNotifications( temp);
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error, could not reject friend request!");
            });
    }
    else // reject party request
    {
        fetch("http://localhost:4000/api/party/declineInvite", {
            method: "DELETE",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: getAuthToken(),
              username: getAuthName(),

              partyId: clickedNotification.id,
              invitedUsername: getAuthName(),
            }),
          })
            .then((r) => checkResponse(r))
            .then((r) => r.json())
            .then((r) => {
              setNotifications(temp);

              toast.success( "Successfully deleted the party request!");
            })
            .catch((err) => {
              console.log(err);
              toast.error("Error, could not reject party request!");
            });
    }
  };

  const getNotification = (notification) => {
    return (
      <div className={"card bg-light p-1 mt-2"}>
        <div className="row">
          <div className="col-6">
            <span className="h5" style={{ height: "30px", lineHeight: "30px" }}>
              {notification.isFriend ? "Friend: " : "Party: "}
            </span>
            {notification.name}
          </div>
          <div className="col-3">
            <button
              className="btn btn-success w-100"
              onClick={() => {
                handleYes(notification);
              }}
            >
              Y
            </button>
          </div>
          <div className="col-3">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                handleNo(notification);
              }}
            >
              N
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card className="text-center p-2" style={{ width: "30vw" }}>
        <h3 className="text-center h3">Invitations</h3>
        { notifications.length > 0 && notifications.map((notification) => getNotification(notification))}
        { notifications.length == 0 && <label>You do not have any new notifications</label>}
      </Card>
    </div>
  );
}
