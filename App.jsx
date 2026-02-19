import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { LayoutDashboard } from "lucide-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApps();
  }, []);

  async function fetchApps() {
    const { data, error } = await supabase.from("apps").select("*");

    if (error) {
      console.error("Error fetching apps:", error);
    } else {
      setApps(data || []);
    }

    setLoading(false);
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", background: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
          <LayoutDashboard color="#4f46e5" size={28} />
          <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
            Nova Apps Control Center
          </h1>
        </div>

        <div style={{ background: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
          {loading ? (
            <p>Loading apps...</p>
          ) : apps.length === 0 ? (
            <p>No apps added yet.</p>
          ) : (
            <table width="100%">
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                  <th>Name</th>
                  <th>Domain</th>
                  <th>Monthly Price</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app) => (
                  <tr key={app.id}>
                    <td>{app.name}</td>
                    <td>{app.domain}</td>
                    <td>${app.monthly_price}</td>
                    <td>{new Date(app.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
