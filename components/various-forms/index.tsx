import { Awards } from "./awards"
import { BaseInfo } from "./base-info"
import { Education } from "./education"
import { Experience } from "./experience"
import { Projects } from "./projects"
import { Skills } from "./skills"

export default function VariousForms() {
  return (
    <>
      <BaseInfo />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Awards />
    </>
  )
}
