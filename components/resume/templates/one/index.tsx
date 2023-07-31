import { cn } from "@/lib/utils"

import { TUserData } from "../../types"
import styles from "./index.module.css"

const style_sort_title = cn(
  "border-b-[3px] border-b-black text-lg font-extrabold uppercase"
)

export default function One(props: TUserData) {
  console.log(props)
  return (
    <div className="space-y-5">
      <section className="profile-area space-y-2">
        <p className="text-end text-3xl font-bold">{props.profile.name}</p>
        <div
          className={cn(
            "flex w-full justify-end text-sm",
            styles.separator_container
          )}
        >
          <a
            className={cn(props.profile.link && styles.separator)}
            href={props.profile.link}
            target="_blank"
            rel="noreferrer"
          >
            {props.profile.link}
          </a>
          <a
            className={cn(props.profile.link && styles.separator)}
            href={"mailto:" + props.profile.email}
          >
            {props.profile.email}
          </a>
          <span className={cn(props.profile.link && styles.separator)}>
            {props.profile.phone}
          </span>
          <span className={cn(props.profile.link && styles.separator)}>
            {props.profile.location}
          </span>
        </div>
      </section>
      <section>
        <h3 className={style_sort_title}>experience</h3>
        <div className="mt-2 space-y-2">
          {props.experience.map((experienceItem) => {
            return (
              <div key={experienceItem._id} className="space-y-1">
                <section>
                  <div className="flex justify-between">
                    <b>{experienceItem.job_title}</b>
                    <div className="bg-black px-1 text-white">
                      <span>{experienceItem.start_date}</span>--
                      <span>{experienceItem.end_date}</span>
                    </div>
                  </div>
                  <i className="text-sm">
                    {experienceItem.company_name}
                    {experienceItem.company_name ? ", " : null}
                    {experienceItem.job_location}
                  </i>
                </section>
                <section className="ml-3">
                  {experienceItem.job_responsibilities
                    ?.split("\n")
                    .map((item) => {
                      if (!item) return

                      return (
                        <div
                          key={item}
                          className="flex items-center space-x-3 text-sm"
                        >
                          <div className="h-1 w-1 bg-black" />
                          <p>{item}</p>
                        </div>
                      )
                    })}
                </section>
              </div>
            )
          })}
        </div>
      </section>
      <section>
        <h3 className={style_sort_title}>skills</h3>
        <div className="mt-2 text-sm">
          {props.skills.map((skill) => {
            return (
              <div key={skill._id}>
                <div className="flex items-center space-x-6 px-6">
                  <i>{skill.skill_kind}</i>
                  <div>{skill.skill_content}</div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
      <section>
        <h3 className={style_sort_title}>projects</h3>
        <div className="mt-2 space-y-2">
          {props.projects.map((projectItem) => {
            return (
              <div key={projectItem._id} className="space-y-1">
                <section>
                  <div className="flex justify-between">
                    <b>{projectItem.project_name}</b>
                  </div>
                  <i className="text-sm">{projectItem.tools_used}</i>
                </section>
                <section className="ml-3">
                  {projectItem.project_description?.split("\n").map((item) => {
                    if (!item) return

                    return (
                      <div
                        key={item}
                        className="flex items-center space-x-3 text-sm"
                      >
                        <div className="h-1 w-1 bg-black" />
                        <p>{item}</p>
                      </div>
                    )
                  })}
                </section>
              </div>
            )
          })}
        </div>
      </section>
      <section>
        <h3 className={style_sort_title}>education</h3>
        <div className="mt-2 text-sm">
          {props.education.map((educationItem) => {
            return (
              <div key={educationItem._id}>
                <section>
                  <div className="flex justify-between">
                    <div>
                      <b>{educationItem.school_name}</b>
                      <div className="space-x-1">
                        <i>{educationItem.major}</i>,
                        <i>{educationItem.degree}</i>
                      </div>
                    </div>
                    <div className="px-1">
                      <span>{educationItem.start_date}</span>--
                      <span>{educationItem.end_date}</span>
                    </div>
                  </div>
                </section>
                <section className="ml-3">
                  {educationItem.additional_information
                    ?.split("\n")
                    .map((item) => {
                      if (!item) return

                      return (
                        <div
                          key={item}
                          className="flex items-center space-x-3 text-sm"
                        >
                          <div className="h-1 w-1 bg-black" />
                          <p>{item}</p>
                        </div>
                      )
                    })}
                </section>
              </div>
            )
          })}
        </div>
      </section>
      <section>
        <h3 className={style_sort_title}>awards</h3>
      </section>
    </div>
  )
}
