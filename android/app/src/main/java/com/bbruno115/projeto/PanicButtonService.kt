package com.myproject

import android.accessibilityservice.AccessibilityService
import android.view.KeyEvent
import android.util.Log

class PanicButtonService : AccessibilityService() {
    private var lastPressTime: Long = 0

    override fun onAccessibilityEvent(event: android.view.accessibility.AccessibilityEvent?) {
        // Não usado neste caso
    }

    override fun onInterrupt() {
        Log.d("PanicButtonService", "Serviço interrompido.")
    }

    override fun onKeyEvent(event: KeyEvent?): Boolean {
        if (event?.keyCode == KeyEvent.KEYCODE_POWER && event.action == KeyEvent.ACTION_DOWN) {
            val currentTime = System.currentTimeMillis()
            if (currentTime - lastPressTime < 500) {
                // Dispara o evento quando o botão é pressionado duas vezes
                PanicModule.triggerPanic()
            }
            lastPressTime = currentTime
            return true
        }
        return super.onKeyEvent(event)
    }
}
