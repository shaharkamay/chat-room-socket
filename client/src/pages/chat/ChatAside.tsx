import React from "react";
function ChatAside({ online }: { online: string[] }) {
  return (
    <aside className="chat__aside">
      {online.map((email, i) => {
        return (
          <div className="aside__user" key={`aside__user${i}`}>
            <div className="online-circle" key={`online-circle${i}`}></div>
            <div className="aside__user--email" key={`aside__user--email${i}`} >{email}</div>
          </div>
        );
      })}
    </aside>
  );
}

export default ChatAside;
