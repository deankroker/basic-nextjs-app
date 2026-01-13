import fs from "fs";
import path from "path";
import WorkshopPage from "./WorkshopPage";

export default async function Home() {
  const readmePath = path.join(process.cwd(), "README.md");
  const readmeContent = fs.readFileSync(readmePath, "utf-8");

  return <WorkshopPage readmeContent={readmeContent} />;
}
