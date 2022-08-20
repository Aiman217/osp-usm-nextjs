import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";

const DiscussionDetail = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (router.query.data) {
      setData(JSON.parse(router.query.data));
    }
  }, []);

  return (
    <>
      <Head>
        <title>OSP@USM | Discussion</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        Enter
        {console.log(data)}
      </div>
    </>
  );
};

export default DiscussionDetail;
