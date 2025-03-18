package expo.modules.modulesworkshops

import android.content.Context
import androidx.core.content.res.ResourcesCompat
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import org.maplibre.android.camera.CameraPosition
import org.maplibre.android.camera.CameraUpdateFactory
import org.maplibre.android.geometry.LatLng
import org.maplibre.android.maps.MapView
import org.maplibre.android.maps.MapLibreMap
import org.maplibre.android.camera.CameraUpdateFactory.newCameraPosition
import org.maplibre.android.utils.BitmapUtils
import org.maplibre.android.plugins.annotation.SymbolManager
import org.maplibre.android.plugins.annotation.SymbolOptions

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

  fun setCameraCenter(latitude: Double, longitude: Double) {
    mapView.getMapAsync { map ->
      val cameraPosition: CameraPosition = CameraPosition.Builder()
        .target(LatLng(latitude, longitude))
        .zoom(11.0)
        .build()
      map.moveCamera(newCameraPosition(cameraPosition))
    }
  }

  fun addMarker(latitude: Double, longitude: Double) {
    mapView.getMapAsync { map ->
      val drawable = ResourcesCompat.getDrawable(
        this.resources,
        org.maplibre.android.R.drawable.maplibre_marker_icon_default,
        null
      )
      map.style?.addImage("icon", BitmapUtils.getBitmapFromDrawable(drawable)!!)

      val symbolManager = map.style?.let { SymbolManager(mapView, map, it) }
      val symbolOptions = SymbolOptions()
        .withLatLng(LatLng(latitude, longitude))
        .withIconImage("icon")
        .withIconSize(1.0f)
      val symbol = symbolManager!!.create(symbolOptions)
      symbolManager.update(symbol)
    }
  }
}
