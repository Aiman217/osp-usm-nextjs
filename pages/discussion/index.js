import Head from "next/head";
import { useRouter } from "next/router";
import { getDocs, collection } from "firebase/firestore";
import { db } from "/firebase-config";
import Moment from "moment";

export async function getServerSideProps(context) {
  const { res } = context;
  res.setHeader("Cache-Control", `s-maxage=60, stale-while-revalidate`);

  const dataDiscuss = await getDocs(collection(db, "discussion"));

  return {
    props: {
      discussList: JSON.stringify(
        dataDiscuss.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      ),
    }, // will be passed to the page component as props
  };
}

const Discussion = ({ discussList }) => {
  discussList = JSON.parse(discussList);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>OSP@USM | Discussion</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="py-4 flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] sm:w-[80%]">
          <h2 className="bg-base-100 rounded-full px-3 py-1 text-lg text-center mb-4 font-bold">
            Discussion
          </h2>
          <div className="card w-full overflow-x-auto border-2 py-4">
            <table className="table table-zebra table-compact">
              <thead>
                <tr>
                  <th></th>
                  <th>Title</th>
                  <th>Desc</th>
                  <th>Created At</th>
                  <th>Upvote</th>
                </tr>
              </thead>
              <tbody>
                {discussList.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      router.push({
                        pathname: `/discussion/${item.id}`,
                        query: { data: JSON.stringify(item) },
                      });
                    }}
                    className="cursor-pointer"
                  >
                    <th>{++index}</th>
                    <td>{item.title}</td>
                    <td>{item.desc.substring(0, 24) + "..."}</td>
                    <td>
                      {Moment.unix(item.created_at.seconds).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td>{item.upvote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Discussion;
