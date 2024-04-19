import React, { useEffect, useRef } from 'react';
import { TweenLite, Circ } from 'gsap';

function Circle(pos, rad, color) {
    this.pos = pos || null;
    this.radius = rad || null;
    this.color = color || null;
    this.active = 0;

    this.draw = function () {
        if (!this.active) return;
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = `rgba(4, 42, 84,${this.active})`;
        ctx.fill();
    };
}

function AnimatedHeader() {
    const canvasRef = useRef(null);
    let width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    useEffect(() => {
      function initHeader() {
          width = window.innerWidth;
          height = window.innerHeight;
          target = { x: width / 2, y: height / 2 };
  
          largeHeader = document.getElementById('large-header');
          largeHeader.style.height = height + 'px';
  
          canvas = canvasRef.current;
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext('2d');
  
          // create points
          points = [];
          for (let x = 0; x < width; x = x + width / 20) {
              for (let y = 0; y < height; y = y + height / 20) {
                  const px = x + Math.random() * width / 20;
                  const py = y + Math.random() * height / 20;
                  const p = { x: px, originX: px, y: py, originY: py };
                  points.push(p);
              }
          }
  
          // for each point find the 5 closest points
          for (let i = 0; i < points.length; i++) {
              const closest = [];
              const p1 = points[i];
              for (let j = 0; j < points.length; j++) {
                  const p2 = points[j];
                  if (!(p1 === p2)) {
                      let placed = false;
                      for (let k = 0; k < 5; k++) {
                          if (!placed) {
                              if (closest[k] === undefined) {
                                  closest[k] = p2;
                                  placed = true;
                              }
                          }
                      }
  
                      for (let k = 0; k < 5; k++) {
                          if (!placed) {
                              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                  closest[k] = p2;
                                  placed = true;
                              }
                          }
                      }
                  }
              }
              p1.closest = closest;
          }
  
          // assign a circle to each point
          for (const i in points) {
              const c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
              points[i].circle = c;
          }
      }
  
      // Event handling
      function addListeners() {
          if (!('ontouchstart' in window)) {
              window.addEventListener('mousemove', mouseMove);
          }
          window.addEventListener('scroll', scrollCheck);
          window.addEventListener('resize', resize);
      }
  
      function mouseMove(e) {
          let posx = 0, posy = 0;
          if (e.pageX || e.pageY) {
              posx = e.pageX;
              posy = e.pageY;
          } else if (e.clientX || e.clientY) {
              posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
              posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
          }
          target.x = posx;
          target.y = posy;
      }
  
      function scrollCheck() {
          animateHeader = document.body.scrollTop > height ? false : true;
      }
  
      function resize() {
          width = window.innerWidth;
          height = window.innerHeight;
          largeHeader.style.height = height + 'px';
          canvas.width = width;
          canvas.height = height;
      }
  
      function initAnimation() {
          animate();
          for (const i in points) {
              shiftPoint(points[i]);
          }
      }
  
      function animate() {
          if (animateHeader) {
              ctx.clearRect(0, 0, width, height);
              for (const i in points) {
                  // detect points in range
                  if (Math.abs(getDistance(target, points[i])) < 4000) {
                      points[i].active = 0.3;
                      points[i].circle.active = 0.6;
                  } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                      points[i].active = 0.1;
                      points[i].circle.active = 0.3;
                  } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                      points[i].active = 0.02;
                      points[i].circle.active = 0.1;
                  } else {
                      points[i].active = 0;
                      points[i].circle.active = 0;
                  }
  
                  drawLines(points[i]);
                  points[i].circle.draw();
              }
          }
          requestAnimationFrame(animate);
      }
  
      function shiftPoint(p) {
          TweenLite.to(p, 1 + 1 * Math.random(), {
              x: p.originX - 50 + Math.random() * 100,
              y: p.originY - 50 + Math.random() * 100,
              ease: Circ.easeInOut,
              onComplete: function () {
                  shiftPoint(p);
              }
          });
      }
  
      // Canvas manipulation
      function drawLines(p) {
          if (!p.active) return;
          for (const i in p.closest) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p.closest[i].x, p.closest[i].y);
              ctx.strokeStyle = 'rgba(4, 42, 84,' + p.active + ')';
              ctx.stroke();
          }
      }
  
      function Circle(pos, rad, color) {
          const _this = this;
  
          // constructor
          (function () {
              _this.pos = pos || null;
              _this.radius = rad || null;
              _this.color = color || null;
          })();
  
          this.draw = function () {
              if (!_this.active) return;
              ctx.beginPath();
              ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
              ctx.fillStyle = 'rgba(4, 42, 84,' + _this.active + ')';
              ctx.fill();
          };
      }
  
      // Util
      function getDistance(p1, p2) {
          return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
      }
  
      initHeader();
      initAnimation();
      addListeners();
  
      return () => {
          window.removeEventListener('mousemove', mouseMove);
          window.removeEventListener('scroll', scrollCheck);
          window.removeEventListener('resize', resize);
      };
  }, []);

    return (
            <canvas
            id="demo-canvas"
            ref={canvasRef}
            // style={{
            //   position: 'fixed',
            //   top: 0,
            //   left: 0,
            //   zIndex: -1,
            //   width: '100vw',
            //   height: '100vh',
            // }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
              maxWidth: '100vw',
              maxHeight: '100vh',
            }}
          ></canvas>
    );
}

export default AnimatedHeader;
