import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import {
  ReactQueryDevtools
} from "@tanstack/react-query-devtools";
import Dashboard from "@/pages/Dashboard";
import Refers from "@/pages/Dashboard/Refers";
import Wallet from "@/pages/Dashboard/Wallet";
import Announcements from "@/pages/Dashboard/Announcements";
import Home from "@/pages/Home";
import Start from "@/pages/Start";
import Contact from "@/pages/Contact";
import Terms from "@/pages/Terms";
import Refund from "@/pages/Refund";
import Privacy from "@/pages/Privacy";
import About from "@/pages/About";
import Login from "@/pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import Signup from "@/pages/Signup";
import Payment from "@/pages/Payment";
import PayStep from "@/pages/PayStep";
import PayDetails from "@/pages/PayDetails";
import WhyPayDirect from "@/pages/WhyPayDirect";
import Invite from "@/pages/Invite";
import Video from "@/pages/Video";
//import Invite from "@/pages/Invite";
import Overview from "@/pages/Dashboard/Overview";


import Settings from "@/pages/Dashboard/Settings";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/start" element={<Start />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/pay-step" element={<PayStep />} />
        <Route path="/pay-details" element={<PayDetails />} />
        <Route path="/why-pay-direct" element={<WhyPayDirect />} />
      <Route path="/invite/:referId" element={<Invite />} />
      <Route path="/video/:url" element={<Video />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Overview />} />

          <Route path="refers" element={<Refers />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route
      path="*"
      element={
      <main style={ { padding: "1rem" }}>
              <p>
There's nothing here!
      </p>
            </main>
      }
      />
      </Routes>
      </ScrollToTop>
    </Router>
     </QueryClientProvider>
  );
}

export default App;