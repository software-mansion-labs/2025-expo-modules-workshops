package expo.modules.settings

import android.content.Context
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import org.maplibre.android.camera.CameraUpdateFactory
import org.maplibre.android.geometry.LatLng
import org.maplibre.android.maps.MapView
import org.maplibre.android.maps.MapLibreMap

class ExpoMapView(context: Context, appContext: AppContext) : ExpoView(context, appContext),
  MapLibreMap.OnMapClickListener {
  private val onMapPress by EventDispatcher()

  private val mapView = MapView(context).apply {
    layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
  }

  init {
    setStyle("standard")
    addView(mapView)
    mapView.getMapAsync { map ->
      map.addOnMapClickListener(this)
    }
  }

  private val key = "6CHxX3uEpovRRtCpi1ej"
  private val satelliteStyle = "https://api.maptiler.com/maps/satellite/style.json?key=$key"
  private val streetStyle = "https://api.maptiler.com/maps/streets/style.json?key=$key"

  fun setStyle(style: String) {
    if (style == "satellite") {
      mapView.getMapAsync { map -> map.setStyle(satelliteStyle) }
    } else {
      mapView.getMapAsync { map -> map.setStyle(streetStyle) }
    }
  }

  override fun onMapClick(data: LatLng): Boolean {
    onMapPress.invoke(mapOf(
      "latitude" to data.latitude,
      "longitude" to data.longitude,
    ))
    return true
  }

  fun moveTo(position: LatLng, animated: Boolean) {
    mapView.getMapAsync { map ->
      val cameraPosition = map.cameraPosition
      val newCameraPosition = CameraUpdateFactory.CameraPositionUpdate(
        cameraPosition.bearing,
        position,
        cameraPosition.zoom,
        cameraPosition.tilt,
        cameraPosition.padding
      )
      if (animated) {
        map.animateCamera(newCameraPosition)
      } else {
        map.moveCamera(newCameraPosition)
      }
    }
  }
}
