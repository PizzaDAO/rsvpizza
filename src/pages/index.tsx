import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const user = useUser();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          {!user.isSignedIn && <SignInButton />}
          {!!user.isSignedIn && <SignOutButton />}
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
      </main>
    </>
  );
};

export default Home;
