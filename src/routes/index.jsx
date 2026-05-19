import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home           from "../Pages/Home/Home";
import About          from "../Pages/About/About";
import Contact        from "../Pages/Contact/Contact";
import Investors      from "../Pages/Investors/Investors";
import CaseStudies    from "../Pages/CaseStudies/CaseStudies";
import Exporters      from "../Pages/Exporters/Exporters";
import ExportFactoring from "../Pages/ExportFactoring/ExportFactoring";
import NotFound       from "../Pages/NotFound/NotFound";

// Add new pages here — one line per route.
const LAYOUT_ROUTES = [
  { path: "/",                element: <Home /> },
  { path: "/about",           element: <About /> },
  { path: "/contact",         element: <Contact /> },
  { path: "/investors",       element: <Investors /> },
  { path: "/case-studies",    element: <CaseStudies /> },
  { path: "/exporters",       element: <Exporters /> },
  { path: "/export-factoring", element: <ExportFactoring /> },
];

export default function AppRoutes() {
  return (
    <Routes>
      {LAYOUT_ROUTES.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<MainLayout>{element}</MainLayout>}
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
