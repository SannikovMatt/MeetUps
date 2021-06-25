import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails({ meetupData, ...props }) {
  return (
    <>
      <Head>
        <title>Detailed meet up</title>
        <meta name="description" content={`${meetupData.all.desc}`} />
      </Head>
      <MeetupDetail {...meetupData.all} />
    </>
  );
}

export async function getStaticProps(context) {
  const { meetUpId } = context.params;

  const client = await MongoClient.connect(
    "mongodb+srv://lubimec:lubimec211@cluster0.yxem7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",

    { useUnifiedTopology: true }
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetUpId),
  });

  const { _id, image, description, address, title } = selectedMeetup;
  return {
    props: {
      meetupData: {
        all: {
          id: _id.toString(),
          desc: description,
          title,
          img: image,
          address: address,
        },
      },
    },
  };
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://lubimec:lubimec211@cluster0.yxem7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",

    { useUnifiedTopology: true }
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    paths: meetups.map((meetup) => ({
      params: {
        meetUpId: meetup._id.toString(),
      },
    })), //indicates that no page needs be created at build time
    fallback: false, //indicates the type of fallback
  };
}

export default MeetupDetails;
