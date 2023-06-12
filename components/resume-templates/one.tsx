import { TUserData } from "@/types/resume-core"

export default function One(props: TUserData) {
  return (
    <div className="space-y-2">
      <section className="profile-area space-y-2">
        <p className="text-end text-3xl font-bold">{props.profile.name}</p>
        <div className="text-text-sm flex justify-end space-x-2">
          <a href={props.profile.link} target="_blank" rel="noreferrer">
            {props.profile.link}
          </a>
          <span>|</span>
          <a href={"mailto:" + props.profile.email}>{props.profile.email}</a>
          <span>|</span>
          <span>{props.profile.phone}</span>
          <span>|</span>
          <span>{props.profile.location}</span>
        </div>
      </section>
      <section>
        <h3 className="border-b-[3px] border-b-black text-xl font-extrabold uppercase">
          experience
        </h3>
      </section>
      <section>
        <h3 className="border-b-[3px] border-b-black text-xl font-extrabold uppercase">
          skills
        </h3>
      </section>
      <section>
        <h3 className="border-b-[3px] border-b-black text-xl font-extrabold uppercase">
          projects
        </h3>
      </section>
      <section>
        <h3 className="border-b-[3px] border-b-black text-xl font-extrabold uppercase">
          awards
        </h3>
      </section>
      <section>
        <h3 className="border-b-[3px] border-b-black text-xl font-extrabold uppercase">
          education
        </h3>
      </section>
    </div>
  )
}
