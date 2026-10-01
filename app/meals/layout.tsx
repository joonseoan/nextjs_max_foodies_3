import { ReactNode } from "react";


// [IMPORTANT]
// Global layout still impacts on this MealsLayout.
// This means that this MealsLayout does not override Global layout.
// It is concatenating, not overriding.

// [IMPORTANT]
// Also, this MealsLayout wraps the all the nested pages in this Meals folder.
function MealsLayout({ children }: ReactNode) {
  return <>
    {/* <p>Meals Header</p> */}
    {children}
  </>
}

export default MealsLayout;




