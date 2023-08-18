import { Awards } from "./awards"
import { BaseInfo } from "./base-info"
import { Education } from "./education"
import { Experience } from "./experience"
import { Projects } from "./projects"
import { RecordList } from "./record-list"
import { Skills } from "./skills"
import { TemplateList } from "./template-list"

export default function VariousForms() {
  return (
    <>
      <TemplateList />
      <RecordList />
      <BaseInfo />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Awards />
    </>
  )
}
