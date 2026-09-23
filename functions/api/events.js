/**
 * Cloudflare Pages Function: /api/events
 * Handles REST CRUD operations on Cloudflare D1 Database (env.DB)
 */

export async function onRequestGet(context) {
  const { env } = context;
  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ 
        error: "Cloudflare D1 binding (DB) not configured", 
        d1_active: false 
      }), {
        status: 200,
        headers: { 
          "Content-Type": "application/json", 
          "Access-Control-Allow-Origin": "*" 
        }
      });
    }

    const { results } = await env.DB.prepare(
      "SELECT id, date, title, venue, city, country, stage, status, flyer, maps_url AS mapsUrl FROM events ORDER BY date ASC"
    ).all();

    return new Response(JSON.stringify({ 
      success: true, 
      d1_active: true, 
      data: results 
    }), {
      headers: { 
        "Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*" 
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message, d1_active: false }), {
      status: 500,
      headers: { 
        "Content-Type": "application/json", 
        "Access-Control-Allow-Origin": "*" 
      }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 database binding not configured", d1_active: false }), { 
        status: 503,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const body = await request.json();
    const id = body.id || ('gig-' + Date.now());
    const date = body.date || '';
    const title = body.title || '';
    const venue = body.venue || body.title || '';
    const city = body.city || '';
    const country = body.country || 'Indonesia';
    const stage = body.stage || 'Headline Performance';
    const status = body.status || 'Available';
    const flyer = body.flyer || '/asset/image-1.JPG';
    const maps_url = body.mapsUrl || body.maps_url || `https://maps.google.com/?q=${encodeURIComponent(city + ' ' + title)}`;

    if (!date || !title || !city) {
      return new Response(JSON.stringify({ error: "Missing required fields (date, title, city)" }), { 
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    await env.DB.prepare(
      "INSERT INTO events (id, date, title, venue, city, country, stage, status, flyer, maps_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(id, date, title, venue, city, country, stage, status, flyer, maps_url).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Event created in D1", 
      data: { id, date, title, venue, city, country, stage, status, flyer, mapsUrl: maps_url } 
    }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}

export async function onRequestPut(context) {
  const { request, env } = context;
  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 database binding not configured", d1_active: false }), { 
        status: 503,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const body = await request.json();
    const { id, date, title, venue = title, city, country = 'Indonesia', stage = 'Headline Performance', status = 'Available', flyer = '/asset/image-1.JPG', mapsUrl } = body;
    const maps_url = mapsUrl || body.maps_url || `https://maps.google.com/?q=${encodeURIComponent(city + ' ' + title)}`;

    if (!id || !date || !title || !city) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { 
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    await env.DB.prepare(
      "UPDATE events SET date = ?, title = ?, venue = ?, city = ?, country = ?, stage = ?, status = ?, flyer = ?, maps_url = ? WHERE id = ?"
    ).bind(date, title, venue, city, country, stage, status, flyer, maps_url, id).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Event updated in D1", 
      data: { id, date, title, venue, city, country, stage, status, flyer, mapsUrl: maps_url } 
    }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  try {
    if (!env.DB) {
      return new Response(JSON.stringify({ error: "D1 database binding not configured", d1_active: false }), { 
        status: 503,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    const url = new URL(request.url);
    let id = url.searchParams.get("id");
    
    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id;
    }

    if (!id) {
      return new Response(JSON.stringify({ error: "Event ID is required for deletion" }), { 
        status: 400,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    await env.DB.prepare("DELETE FROM events WHERE id = ?").bind(id).run();

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Event ${id} deleted from D1` 
    }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
