import mapboxgl from 'mapbox-gl'

const config = require("../config.json");

const generateAgentGeoJSON = (agents, layerId, title = false) => ({
  id: layerId,
  type: "symbol",
  source: {
    type: "geojson",
    data: generateAgentDetails(agents)
  },
  layout: {
    "icon-image": {
      stops: [
        [0, "agent_to_online"],
        [1, "agent_on_task"],
        [2, "agent_no_task"],
        [3, "agent_to_offline"],
        [4, "agent_to_ooc"],
        [5, "agent_task_start"],
        [6, "agent_finish_task"],
        [7, "to_reachable"],
        [8, "unreachable"]
      ],
      property: "event",
      type: "categorical"
    },
    "icon-size": 0.75,
    // "icon-rotate": 180,
    "icon-anchor": "top",
    "icon-allow-overlap": true,
    "text-field": title ? "{first_name}" : "",
    "text-size": 16,
    // "text-font": config["DINGI_MAP_ENG_TEXT_FONT"],
    "text-offset": {
      stops: [
        [0, [0, 2.6]],
        [1, [0, 0.9]],
        [2, [0, 0.9]],
        [3, [0, 2.6]],
        [4, [0, 2.6]],
        [5, [0, 2.6]],
        [6, [0, 2.6]],
        [7, [0, 2.6]],
        [8, [0, 0.9]]
      ],
      property: "event",
      type: "categorical"
    }
  },
  paint: {
    "text-color": "#258F5E"
  }
});

const generateAgentDetails = agents => ({
  type: "FeatureCollection",
  features: agents.map(agent => {
    const first_name = agent.full_name.split(" ").slice(0, 1);
    const agent_name = agent.full_name;

    return {
      type: "Feature",
      properties: {
        ...agent,
        first_name,
        agent_name
      },
      geometry: {
        type: "Point",
        coordinates: [agent.point.lng, agent.point.lat]
      }
    };
  })
});

const generateTaskGeoJSON = (tasks, layerId, title = false) => ({
  id: layerId,
  type: "symbol",
  source: {
    type: "geojson",
    data: generateTaskDetails(tasks)
  },
  layout: {
    "icon-image": {
      stops: [
        [0, "task_unassigned"],
        [1, "task_remaining"],
        [2, "task_inprogress"],
        [3, "task_complete"],
        [4, "task_cancelled"],
        [5, "task_postponed"]
      ],
      property: "status",
      type: "categorical"
    },
    "icon-size": 0.75,
    // "icon-rotate": 180,
    "icon-anchor": "top",
    "icon-allow-overlap": true,
    "text-field": title ? "{title}" : "",
    "text-size": 12,
    // "text-font": config["DINGI_MAP_ENG_TEXT_FONT"],
    "text-offset": [0, -0.6]
  },
  paint: {
    "text-color": "rgba(30,188,233,1)"
  }
});

const generateTaskDetails = tasks => ({
  type: "FeatureCollection",
  features: tasks.map(task => {
    return {
      type: "Feature",
      properties: {
        ...task
      },
      geometry: {
        type: "Point",
        coordinates: [task.point.lng, task.point.lat]
      }
    };
  })
});

const setupMap = Component => {
  const { lng, lat, zoom } = Component;

  Component.map = new mapboxgl.Map({
    container: "map",
    center: [lng, lat],
    zoom,
    style: config["MAPBOX_MAP_ENG"],
    attributionControl: false
  });


  // // disable map rotation using right click + drag
  Component.map.dragRotate.disable();

  // // disable map rotation using touch rotation gesture
  Component.map.touchZoomRotate.disableRotation();
  Component.map.on("move", Component.mapMovementHandler);
  Component.map.addControl(new mapboxgl.NavigationControl());

  try {
    // Agent Specific Icon
    Component.map.loadImage(
      "/assets/map_pinned.png",
      (error, agent_finish_task) => {
        if (error) throw error;
        console.log(agent_finish_task)
        Component.map.addImage("agent_finish_task", agent_finish_task);
      }
    );

    //   Component.map.loadImage(
    //     "/assets/agent/agent_on_task.png",
    //     (error, agent_on_task) => {
    //       if (error) throw error;
    //       Component.map.addImage("agent_on_task", agent_on_task);
    //     }
    //   );

    //   Component.map.loadImage(
    //     "/assets/agent/agent_task_start.png",
    //     (error, agent_task_start) => {
    //       if (error) throw error;
    //       Component.map.addImage("agent_task_start", agent_task_start);
    //     }
    //   );

    //   Component.map.loadImage(
    //     "/assets/agent/agent_to_offline.png",
    //     (error, agent_to_offline) => {
    //       if (error) throw error;
    //       Component.map.addImage("agent_to_offline", agent_to_offline);
    //     }
    //   );

    //   Component.map.loadImage(
    //     "/assets/agent/agent_to_online.png",
    //     (error, agent_to_online) => {
    //       if (error) throw error;
    //       Component.map.addImage("agent_to_online", agent_to_online);
    //     }
    //   );

    //   Component.map.loadImage(
    //     "/assets/agent/agent_to_ooc.png",
    //     (error, agent_to_ooc) => {
    //       if (error) throw error;
    //       Component.map.addImage("agent_to_ooc", agent_to_ooc);
    //     }
    //   );

    //   Component.map.loadImage(
    //     "/assets/agent/agent_no_task.png",
    //     (error, agent_no_task) => {
    //       if (error) throw error;
    //       Component.map.addImage("agent_no_task", agent_no_task);
    //     }
    //   );

    //   Component.map.loadImage(
    //     "/assets/agent/unreachable.png",
    //     (error, unreachable) => {
    //       if (error) throw error;
    //       Component.map.addImage("unreachable", unreachable);
    //     }
    //   );

    //   Component.map.loadImage(
    //     "/assets/agent/to_reachable.png",
    //     (error, to_reachable) => {
    //       if (error) throw error;
    //       Component.map.addImage("to_reachable", to_reachable);
    //     }
    //   );

    //   // Task Icon
    //   Component.map.loadImage(
    //     "/assets/task/task_complete.png",
    //     (error, task_complete) => {
    //       if (error) throw error;
    //       Component.map.addImage("task_complete", task_complete);
    //     }
    //   );

    //   Component.map.loadImage(
    //     "/assets/task/task_remaining.png",
    //     (error, task_remaining) => {
    //       if (error) throw error;
    //       Component.map.addImage("task_remaining", task_remaining);
    //     }
    //   );

    //   Component.map.loadImage(
    //     "/assets/task/task_cancelled.png",
    //     (error, task_cancelled) => {
    //       if (error) throw error;
    //       Component.map.addImage("task_cancelled", task_cancelled);
    //     }
    //   );

    //   Component.map.loadImage(
    //     "/assets/task/task_inprogress.png",
    //     (error, task_inprogress) => {
    //       if (error) throw error;
    //       Component.map.addImage("task_inprogress", task_inprogress);
    //     }
    //   );

    //   Component.map.loadImage(
    //     "/assets/task/task_postponed.png",
    //     (error, task_postponed) => {
    //       if (error) throw error;
    //       Component.map.addImage("task_postponed", task_postponed);
    //     }
    //   );

    //   Component.map.loadImage(
    //     "/assets/task/task_unassigned.png",
    //     (error, task_unassigned) => {
    //       if (error) throw error;
    //       Component.map.addImage("task_unassigned", task_unassigned);
    //     }
    //   );
  } catch (err) {
    console.log(err);
  }
};

export {
  setupMap,
  generateAgentGeoJSON,
  generateTaskGeoJSON,
  generateTaskDetails,
  generateAgentDetails
};
