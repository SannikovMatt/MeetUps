import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { MongoClient } from "mongodb";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>Meetups</title>
        <meta name="description" content="List of Meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://lubimec:lubimec211@cluster0.yxem7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",

    { useUnifiedTopology: true }
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  const collection = meetups.map((meetup) => {
    const { title, image, address, _id } = meetup;
    return {
      title,
      image,
      address,
      id: _id.toString(),
    };
  });

  console.log("collection", collection);

  client.close();
  return {
    props: {
      meetups: collection,
    },
    revalidate: 1,
  };
}

export default HomePage;
