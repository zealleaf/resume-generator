import { cn } from "@/lib/utils"

import { TUserData } from "../type"
import styles from "./one.module.css"

const style_sort_title = cn(
  "border-b-[3px] border-b-black text-base font-extrabold uppercase"
)

export default function One(props: TUserData) {
  return (
    <div className="space-y-2">
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
      </section>
      <section>
        <h3 className={style_sort_title}>skills</h3>
      </section>
      <section>
        <h3 className={style_sort_title}>projects</h3>
      </section>
      <section>
        <h3 className={style_sort_title}>awards</h3>
      </section>
      <section>
        <h3 className={style_sort_title}>education</h3>
      </section>
    </div>
  )
}
