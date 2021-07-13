import ReactDom from "react-dom";
import Popup from "react-popup";
import { fieldNames } from "./core";

const PopupMessage = (messages) => {
  const messageText = () => {
    let message = "";

    if (typeof messages === "object") {
      for (const key in messages) {
        message += `${fieldNames[key]} - ${messages[key]}; `;
      }
    }
    else {
      message = messages;
    }

    return message;
  }

  ReactDom.render(
    <Popup />,
    document.getElementById('popupContainer')
  );

  Popup.alert(messageText());
};

export default PopupMessage;