import classes from "./MeetupDetail.module.css";
import Image from "next/image";

function MeetupDetail({ title, img, ...props }) {
  console.log("props", props);

  return (
    <section className={classes.detail}>
      <Image width="768" height="512" src={img} alt={title} />
      <h1>{title}</h1>
      <address>Some street 5,some city</address>
      <p>{props.desc}</p>
    </section>
  );
}

export default MeetupDetail;
