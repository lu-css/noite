import FlowModel from "@/models/FlowModel"
import NoiteAPI from "@/services/NoiteAPI/NoiteAPI";

interface MyBoardsProps {
  boards: FlowModel[]
}

export async function getServerSideProps() {
  const noiteApi = new NoiteAPI();
  const boars = null;
  return { boards } as MyBoardsProps
}
