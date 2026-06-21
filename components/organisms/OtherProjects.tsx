import { Project } from "@/types";
import { ProjectItem } from "../molecules/ProjectItem";

export function OtherProjects({ projects }: { projects: Project[] }) {
	return (
		projects.map((p) => <ProjectItem key={p.slug} project={p} variant="card" />)
	);
}
