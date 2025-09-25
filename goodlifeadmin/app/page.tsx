"use client";

import {UserButton,useUser} from "@clerk/nextjs";

export default function Home() {
    const {user} = useUser();
    if(!user) return ;

    const meta = user.publicMetadata as { department?: string }
  return (
      <div>
          <UserButton/>
          <p>{meta.department} Department</p>
      </div>
  );
}
