import Layout from "../../components/layout/Layout";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetUpHandler(enteredMeetUpData) {
    const resp = await fetch(`/api/new-meetup`, {
      method: "POST",
      body: JSON.stringify(enteredMeetUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();

    console.log("data", data);
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Add new meetup</title>
        <meta name="description" content="Add new Meet up" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetUpHandler} />;
    </>
  );
}

export default NewMeetupPage;
