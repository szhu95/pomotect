# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - link "Kolf" [ref=e6]:
        - /url: /
        - img "Kolf" [ref=e7]
      - generic [ref=e8]:
        - link "Cart" [ref=e9] [cursor=pointer]:
          - /url: /cart/
          - img "Cart" [ref=e11] [cursor=pointer]
        - button [ref=e12]:
          - img [ref=e13]
  - main [ref=e14]:
    - generic [ref=e19]:
      - img "Golf Cart" [ref=e22]
      - heading "Your golf cart is ready" [level=2] [ref=e23]
      - paragraph [ref=e24]: Load up with the perfect gear for your round
      - link "BROWSE COLLECTION" [ref=e25] [cursor=pointer]:
        - /url: /products/
        - button "BROWSE COLLECTION" [ref=e26]
  - button "Open Next.js Dev Tools" [ref=e32] [cursor=pointer]:
    - img [ref=e33] [cursor=pointer]
  - alert [ref=e36]
```