import DashboardBody from "@/components/DashboardBody";
import DashboardContent from "@/components/DashboardContent";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const DiscordLoginScreem = () => {
  const [urlSearchParams, _] = useSearchParams();
  const navigate = useNavigate();

  const [verified, setVerified] = useState(false);
  const [loadingVerifying, setLoadingVerifying] = useState(false);
  const { discordLoginAction } = useAuth();

  const code = urlSearchParams.get("code");
  const permissions = urlSearchParams.get("permissions");
  const guild_id = urlSearchParams.get("guild_id");
  const redirect_uri = "http://localhost:5173/discord/verify";

  if (code === null || permissions === null || guild_id === null) {
    return <div>Invalid</div>;
  }

  useEffect(() => {
    if (code === null || permissions === null || guild_id === null) {
      return;
    }
    setLoadingVerifying(true);
    discordLoginAction(code, permissions, guild_id, redirect_uri).then(() => {
      setVerified(true);
      setLoadingVerifying(false);
      navigate("/");
    });
  }, [code, permissions, guild_id]);

  return (
    <DashboardBody>
      <DashboardContent>
        <div className="pl-8">
          {loadingVerifying && <div>Verifying...</div>}
          {!loadingVerifying && verified && <div>Verified</div>}
        </div>
      </DashboardContent>
    </DashboardBody>
  );
};

export default DiscordLoginScreem;
