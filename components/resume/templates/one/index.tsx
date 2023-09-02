import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"

import { cn, copyToClipboard } from "@/lib/utils"

import { TRecord } from "../../types"
import styles from "./index.module.css"

const style_sort_title = cn(
  "border-b-[3px] border-b-black text-lg font-extrabold uppercase"
)

export default function One(props: TRecord) {
  return (
    <div className="space-y-5">
      <section className="profile-area space-y-2">
        <p className="text-end text-3xl font-bold">{props.profile?.name}</p>
        <div
          className={cn(
            "flex w-full justify-end text-sm",
            styles.separator_container
          )}
        >
          <a
            className={cn(props.profile?.link && styles.separator)}
            href={props.profile?.link}
            target="_blank"
            rel="noreferrer"
          >
            <div className="inline-flex items-center space-x-1">
              <ArrowUpRight size={14} />
              <span>{props.profile?.link}</span>
            </div>
          </a>
          <a
            className={cn(props.profile?.email && styles.separator)}
            href={"mailto:" + props.profile?.email}
          >
            <div className="inline-flex items-center space-x-1">
              <Mail size={14} />
              <span>{props.profile?.email}</span>
            </div>
          </a>
          <span
            className={cn(props.profile?.phone && styles.separator)}
            onClick={() => {
              copyToClipboard(props.profile?.phone || "")
            }}
          >
            <div className="inline-flex items-center space-x-1">
              <Phone size={14} />
              <span>{props.profile?.phone}</span>
            </div>
          </span>
          <span className={cn(props.profile?.location && styles.separator)}>
            <div className="inline-flex items-center space-x-1">
              <MapPin size={14} />
              <span>{props.profile?.location}</span>
            </div>
          </span>
        </div>
      </section>
      <section>
        <h3 className={style_sort_title}>experience</h3>
        <div className="mt-2 space-y-2 text-sm">
          {props.experience?.map((experienceItem) => {
            return (
              <div key={experienceItem._id} className="space-y-1">
                <section>
                  <div className="flex items-center justify-between">
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
                      if (!item) return null

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
          {props.skills?.findIndex((item) => item.skill_kind === "ALL") !== -1
            ? props.skills?.map((skillItem) => {
                return (
                  <div key={skillItem._id} className="space-y-1">
                    {skillItem.skill_content?.split("\n").map((item) => {
                      if (!item) return null

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
                  </div>
                )
              })
            : props.skills?.map((skill) => {
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
        <div className="mt-2 space-y-2 text-sm">
          {props.projects?.map((projectItem) => {
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
                    if (!item) return null

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
          {props.education?.map((educationItem) => {
            return (
              <div key={educationItem._id}>
                <section>
                  <div className="flex items-center justify-between">
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
                      if (!item) return null

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
