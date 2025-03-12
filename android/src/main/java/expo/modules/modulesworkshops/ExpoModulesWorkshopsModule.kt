package expo.modules.modulesworkshops

import android.content.res.Configuration
import android.os.Handler
import android.os.Looper
import android.view.OrientationEventListener
import expo.modules.kotlin.Promise
import expo.modules.kotlin.jni.JavaScriptFunction
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import expo.modules.settings.ExpoMapView
import org.maplibre.android.MapLibre
import org.maplibre.android.geometry.LatLng

class ExpoModulesWorkshopsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoModulesWorkshops")

    Function("multiply") { a: Int, b: Int ->
      return@Function a * b
    }

    Function("passString") { str: String ->
      return@Function "$str new string"
    }

    Function("passArray") { arr: List<Int> ->
      return@Function arr.plus(5)
    }

    data class CustomObject(
      @Field var index: Int = 0,
      @Field var data: String = ""
    ) : Record

    Function("passObject") { obj: CustomObject ->
      obj.index += 1
      obj.data += " new data"
      return@Function obj
    }

    Function("passFunction") { funcToCall: JavaScriptFunction<Any?> ->
      funcToCall.invoke(10)
    }

    AsyncFunction("getPromise") { data: String, promise: Promise ->
      promise.resolve("$data new string")
      sendEvent("onEvent", mapOf("data" to "Ready!"))
    }

    Events("onEvent", "onScreenOrientationChange")

    val orientationEventListener: OrientationEventListener =
      object : OrientationEventListener(appContext.reactContext?.applicationContext) {
        override fun onOrientationChanged(rotation: Int) {
          val orientation = if (rotation % 180 == 0) "VERTICAL" else "HORIZONTAL"
          sendEvent("onScreenOrientationChange", mapOf(
            "orientation" to orientation
          ))
        }
      }
    orientationEventListener.enable()

    Function("getScreenOrientation") {
      val orientation: Int? = appContext.reactContext?.resources?.configuration?.orientation
      return@Function if (orientation == Configuration.ORIENTATION_LANDSCAPE) {
        "HORIZONTAL"
      } else {
        "VERTICAL"
      }
    }

    View(ExpoMapView::class) {
      Handler(Looper.getMainLooper()).post {
        appContext.reactContext?.let { MapLibre.getInstance(it.applicationContext) }
      }

      Prop("mapType") { view: ExpoMapView, mapType: String ->
        view.setStyle(mapType)
      }

      Events("onMapPress")

      AsyncFunction("moveTo") { view: ExpoMapView, lat: Double, lon: Double, animated: Boolean ->
        view.moveTo(LatLng(lat, lon), animated)
      }
    }

  }
}
