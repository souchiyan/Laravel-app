// vite.config.js
import { defineConfig } from "file:///C:/MAMP/htdocs/Larvel-app/%E5%85%B1%E5%90%8C%E9%96%8B%E7%99%BA/Laravel-app/node_modules/vite/dist/node/index.js";
import laravel from "file:///C:/MAMP/htdocs/Larvel-app/%E5%85%B1%E5%90%8C%E9%96%8B%E7%99%BA/Laravel-app/node_modules/laravel-vite-plugin/dist/index.js";
import react from "file:///C:/MAMP/htdocs/Larvel-app/%E5%85%B1%E5%90%8C%E9%96%8B%E7%99%BA/Laravel-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    laravel({
      input: "resources/js/app.jsx",
      refresh: true
    }),
    react()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxNQU1QXFxcXGh0ZG9jc1xcXFxMYXJ2ZWwtYXBwXFxcXFx1NTE3MVx1NTQwQ1x1OTU4Qlx1NzY3QVxcXFxMYXJhdmVsLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcTUFNUFxcXFxodGRvY3NcXFxcTGFydmVsLWFwcFxcXFxcdTUxNzFcdTU0MENcdTk1OEJcdTc2N0FcXFxcTGFyYXZlbC1hcHBcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L01BTVAvaHRkb2NzL0xhcnZlbC1hcHAvJUU1JTg1JUIxJUU1JTkwJThDJUU5JTk2JThCJUU3JTk5JUJBL0xhcmF2ZWwtYXBwL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgbGFyYXZlbCBmcm9tICdsYXJhdmVsLXZpdGUtcGx1Z2luJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICBsYXJhdmVsKHtcbiAgICAgICAgICAgIGlucHV0OiAncmVzb3VyY2VzL2pzL2FwcC5qc3gnLFxuICAgICAgICAgICAgcmVmcmVzaDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIHJlYWN0KCksXG4gICAgXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VixTQUFTLG9CQUFvQjtBQUN6WCxPQUFPLGFBQWE7QUFDcEIsT0FBTyxXQUFXO0FBRWxCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLFFBQVE7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxJQUNiLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxFQUNWO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
