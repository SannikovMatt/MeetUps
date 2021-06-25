import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetUpList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => {
        const { id, image, title, address } = meetup;

        return (
          <MeetupItem
            key={id}
            id={id}
            image={image}
            title={title}
            address={address}
          />
        );
      })}
    </ul>
  );
}

export default MeetUpList;
