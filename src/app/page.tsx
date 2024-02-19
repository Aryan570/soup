// import Graph_test from "@/components/Graph_test";
import Db_check from "@/components/Db_check";
import Grid_check from "@/components/Grid_check";
import Navbar from "@/components/Navbar";
export default function Home() {
  // Override console.error
  // This is a hack to suppress the warning about missing defaultProps in recharts library as of version 2.12
  // @link https://github.com/recharts/recharts/issues/3615
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <div className=" min-h-screen h-screen">
      <Navbar />
      <div className="container h-5/6 mt-7">
        <Grid_check />
      </div>
      <Db_check/>
    </div>
  );
}
