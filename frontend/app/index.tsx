import React from "react";
import { Redirect } from "expo-router";

export default function index() {
  return (
    <>
      <Redirect href={"./(authenticate)/login"} />
    </>
  );
}

//https://nrpkriqwoxunrihiyqss.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ycGtyaXF3b3h1bnJpaGl5cXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NDk2MzcsImV4cCI6MjA1MDAyNTYzN30.F42LVMCuQsZmZxXIX9cV8osF7vQnfzUEbm10gCbfUEA
