import { Container } from "@radix-ui/themes";
import React from "react";

function Sidebar() {
  return (
    <Container gridArea="aside" className=" bg-slate-500 hidden lg:block">
      Aside
    </Container>
  );
}

export default Sidebar;
