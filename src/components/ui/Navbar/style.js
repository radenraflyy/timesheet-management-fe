import { usePathname } from "next/navigation"

export default function useStyles() {
  const path = usePathname()

  // Style for list item navigation
  const styleItemNav = `max-md:mr-3 hover:border-b-[3px] border-[#2775EC] hover:text-[#2775EC] lg:py-6 lg:px-3 duration-150 max-md:border max-md:p-1 max-md:rounded-md max-md:shadow-md ${
    path === "/" && "border-b-[3px] border-[#2775EC] text-[#2775EC]"
  }`
  const styleItemNavSettings = `hover:border-b-[3px] border-[#2775EC] hover:text-[#2775EC] lg:py-6 lg:px-4 duration-150 max-md:border max-md:p-1 max-md:rounded-md max-md:shadow-md ${
    path === "/settings" && "border-b-[3px] border-[#2775EC] text-[#2775EC]"
  }`

  return { styleItemNav, styleItemNavSettings }
}
