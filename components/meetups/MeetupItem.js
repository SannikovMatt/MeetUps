import { useRouter } from "next/router";
import Image from "next/image";

import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem({ id, ...props }) {
  const router = useRouter();
  function showDetailsHandler() {
    router.push(`/${id}`);
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <Image width="768" height="512" src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
